<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'required_without:phone'],
            'phone' => ['nullable', 'string', 'regex:/^[0-9]+$/', 'min:8', 'max:50', 'required_without:email'],
            'message' => ['required', 'string', 'max:5000'],
        ];
    }

    /**
     * Get custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'name.max' => 'Name cannot exceed 255 characters.',
            'email.email' => 'Please enter a valid email address.',
            'email.required_without' => 'Please provide either an email or phone number.',
            'phone.regex' => 'Phone number must contain only numbers.',
            'phone.min' => 'Phone number must be at least 8 digits.',
            'phone.required_without' => 'Please provide either an email or phone number.',
            'message.required' => 'Please enter a message.',
            'message.max' => 'Message cannot exceed 5000 characters.',
        ];
    }
}
