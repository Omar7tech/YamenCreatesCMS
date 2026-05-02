<?php

namespace App\Filament\Widgets;

use App\Models\Event;
use Filament\Forms;
use Illuminate\Database\Eloquent\Model;
use Saade\FilamentFullCalendar\Actions;
use Saade\FilamentFullCalendar\Widgets\FullCalendarWidget;

class EventsCalendar extends FullCalendarWidget
{
    public Model | string | null $model = Event::class;

    public function fetchEvents(array $fetchInfo): array
    {
        return Event::query()
            ->where('starts_at', '>=', $fetchInfo['start'])
            ->where('ends_at', '<=', $fetchInfo['end'])
            ->get()
            ->map(fn (Event $event) => [
                'id' => $event->id,
                'title' => $event->title,
                'start' => $event->starts_at,
                'end' => $event->ends_at,
                'allDay' => $event->all_day,
                'backgroundColor' => $event->background_color,
                'borderColor' => $event->background_color,
                'textColor' => $event->text_color,
            ])
            ->toArray();
    }

    public function config(): array
    {
        return [
            'editable' => true,
            'selectable' => true,
            'headerToolbar' => [
                'left' => 'prev,next today',
                'center' => 'title',
                'right' => 'dayGridMonth,dayGridWeek,dayGridDay',
            ],
            'initialView' => 'dayGridMonth',
            'firstDay' => 1,
            'displayEventTime' => false,
        ];
    }

    protected function headerActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->mountUsing(function ($form, array $arguments) {
                    $start = $arguments['start'] ?? now();
                    $end = $arguments['end'] ?? now()->addDay();

                    $form->fill([
                        'title' => '',
                        'starts_at' => $start,
                        'ends_at' => $end,
                        'all_day' => true,
                        'background_color' => '#3b82f6',
                        'text_color' => '#ffffff',
                    ]);
                }),
        ];
    }

    protected function modalActions(): array
    {
        return [
            Actions\EditAction::make()
                ->mountUsing(function (Event $record, $form, array $arguments) {
                    $form->fill([
                        'title' => $record->title,
                        'description' => $record->description,
                        'starts_at' => $arguments['event']['start'] ?? $record->starts_at,
                        'ends_at' => $arguments['event']['end'] ?? $record->ends_at,
                        'all_day' => $record->all_day,
                        'background_color' => $record->background_color,
                        'text_color' => $record->text_color,
                    ]);
                }),
            Actions\DeleteAction::make(),
        ];
    }

    public function getFormSchema(): array
    {
        return [
            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->columnSpanFull(),

            Forms\Components\Textarea::make('description')
                ->rows(3)
                ->columnSpanFull(),

            Forms\Components\DatePicker::make('starts_at')
                ->label('Start Date')
                ->required()
                ->native(false)
                ->live()
                ->afterStateUpdated(function ($state, callable $set, callable $get) {
                    if ($state && !$get('ends_at')) {
                        $set('ends_at', now()->parse($state)->addDay()->toDateString());
                    }
                }),

            Forms\Components\DatePicker::make('ends_at')
                ->label('End Date')
                ->required()
                ->native(false)
                ->afterOrEqual('starts_at'),

            Forms\Components\ColorPicker::make('background_color')
                ->label('Color')
                ->default('#3b82f6'),

            Forms\Components\ColorPicker::make('text_color')
                ->label('Text Color')
                ->default('#ffffff'),
        ];
    }
}
