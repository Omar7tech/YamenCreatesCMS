<?php

namespace App\Filament\Pages;

use App\Models\Task;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;
use Filament\Tables\Filters\SelectFilter;
use Relaticle\Flowforge\Components\CardFlex;
use Illuminate\Database\Eloquent\Builder;
use Relaticle\Flowforge\Board;
use Relaticle\Flowforge\BoardPage;
use Relaticle\Flowforge\Column;

class TaskBoard extends BoardPage
{
    protected static string|null|\BackedEnum $navigationIcon = 'heroicon-o-view-columns';
    protected static ?string $navigationLabel = 'Task Board';
    protected static ?string $title = 'Task Board';

    public function board(Board $board): Board
    {
        return $board
            ->query($this->getEloquentQuery())
            ->recordTitleAttribute('title')
            ->columnIdentifier('status')
            ->positionIdentifier('position') // Enable drag-and-drop with position field
            ->columns([
                Column::make('todo')->label('To Do')->color('gray'),
                Column::make('in_progress')->label('In Progress')->color('blue'),
                Column::make('completed')->label('Completed')->color('green'),
            ])->recordTitleAttribute('title')                   // Card title field
            ->cardSchema(
                fn(Schema $schema) => $schema        // Rich card content
                    ->components([
                        TextEntry::make('description')
                            ->limit(150)
                            ->color('gray')
                            ->visible(fn ($record) => !empty($record->description)),
                        CardFlex::make([
                            TextEntry::make('due_date')
                                ->badge()
                                ->date()
                                ->icon('heroicon-o-calendar')
                                ->color(fn ($record) => $record->due_date && $record->due_date->isPast() ? 'danger' : 'gray')
                                ->visible(fn ($record) => !empty($record->due_date)),
                        ])->justify('start')->wrap(),
                    ])
            )->cardActions([                                   // Card-level actions
                    EditAction::make()
                        ->model(Task::class)
                        ->form([
                            TextInput::make('title')->required(),
                            Textarea::make('description'),
                            DatePicker::make('due_date'),
                        ]),
                    DeleteAction::make()->model(Task::class),
                ])
            ->columnActions([
                CreateAction::make()
                    ->model(Task::class)
                    ->form([
                        TextInput::make('title')->required(),
                        Textarea::make('description'),
                        DatePicker::make('due_date'),
                    ])
                    ->mutateFormDataUsing(function (array $data, array $arguments): array {
                        if (isset($arguments['column'])) {
                            $data['status'] = $arguments['column'];
                            $data['position'] = $this->getBoardPositionInColumn($arguments['column']);
                        }
                        return $data;
                    }),
            ])
            ->searchable(['title', 'description'])
            ->filters([
                SelectFilter::make('due_date')
                    ->label('Due Date')
                    ->options([
                        'overdue' => 'Overdue',
                        'today' => 'Due Today',
                        'this_week' => 'Due This Week',
                        'no_date' => 'No Due Date',
                    ])
                    ->query(function ($query, $data) {
                        if (!isset($data['value'])) return $query;

                        return match($data['value']) {
                            'overdue' => $query->whereNotNull('due_date')->whereDate('due_date', '<', now()),
                            'today' => $query->whereDate('due_date', now()),
                            'this_week' => $query->whereBetween('due_date', [now()->startOfWeek(), now()->endOfWeek()]),
                            'no_date' => $query->whereNull('due_date'),
                            default => $query,
                        };
                    }),
            ])
            ->headerToolbar()
            ->cardAction('edit');
    }

    public function getEloquentQuery(): Builder
    {
        return Task::query();
    }
}
