# Contact Form Refactoring Plan

## Current State
**File**: `components/sections/contact-section.tsx`
**Lines**: 710
**Status**: ⚠️ God Component - Needs refactoring

## Issues
1. **Single Responsibility Violation**: Handles 3 steps, validation, submission, UI, state management
2. **Hard to Test**: All logic coupled together
3. **Hard to Maintain**: Changes to one step affect the entire file
4. **Code Duplication**: Similar patterns repeated across steps
5. **Not Reusable**: Form logic tightly coupled to UI

## Recommended Structure

```
components/sections/contact-section/
├── index.tsx                    # Main orchestrator (50 lines)
├── ContactStep1.tsx             # Personal info step (120 lines)
├── ContactStep2.tsx             # Company info step (130 lines)
├── ContactStep3.tsx             # Project details step (150 lines)
├── ContactProgress.tsx          # Progress bar component (40 lines)
├── ContactFooter.tsx            # Footer with social links (80 lines)
├── ContactFormField.tsx         # Reusable form field (30 lines)
├── ContactCheckbox.tsx          # Reusable checkbox (25 lines)
├── ContactTextarea.tsx          # Reusable textarea (30 lines)
└── useContactForm.ts            # Custom hook for form logic (85 lines)
```

## Step-by-Step Refactoring Guide

### Phase 1: Extract Custom Hook (1-2 hours)
**Goal**: Separate business logic from UI

```typescript
// hooks/useContactForm.ts
export function useContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({...});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNumber: number): boolean => {
    // Step validation logic
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    // Submission logic
  };

  return {
    step,
    formData,
    isSubmitting,
    submitStatus,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  };
}
```

### Phase 2: Extract Reusable Form Components (2-3 hours)
**Goal**: DRY up form fields

```typescript
// components/forms/FormInput.tsx
export function FormInput({
  label,
  name,
  type = 'text',
  required,
  value,
  onChange,
  error,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-bold mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          "w-full border-2 border-black bg-white text-black p-4",
          error && "border-red-500"
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
```

### Phase 3: Split Steps into Components (3-4 hours)
**Goal**: Modular step components

```typescript
// components/sections/contact-section/ContactStep1.tsx
export function ContactStep1({ formData, updateFormData, nextStep }: Step1Props) {
  return (
    <div>
      <h3>Personal Information</h3>
      <FormInput
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={(e) => updateFormData('fullName', e.target.value)}
        required
      />
      {/* More fields */}
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}
```

### Phase 4: Extract Progress and Footer (1 hour)
**Goal**: Separate UI concerns

```typescript
// components/sections/contact-section/ContactProgress.tsx
export function ContactProgress({ currentStep, totalSteps }: ProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-8 h-8 rounded-full border-2 border-black flex items-center justify-center",
            i + 1 === currentStep && "bg-black text-white"
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
```

### Phase 5: Main Orchestrator (1 hour)
**Goal**: Clean index file

```typescript
// components/sections/contact-section/index.tsx
export default function ContactSection() {
  const {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
  } = useContactForm();

  return (
    <section id="contact">
      <ContactProgress currentStep={step} totalSteps={3} />

      {step === 1 && (
        <ContactStep1
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <ContactStep2
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <ContactStep3
          formData={formData}
          updateFormData={updateFormData}
          prevStep={prevStep}
          onSubmit={handleSubmit}
        />
      )}

      <ContactFooter />
    </section>
  );
}
```

## Benefits After Refactoring

### Testability
- ✅ Each step can be unit tested independently
- ✅ Form logic (useContactForm) can be tested in isolation
- ✅ UI components can be tested with storybook

### Maintainability
- ✅ Changes to one step don't affect others
- ✅ Clear separation of concerns
- ✅ Easy to add/remove fields
- ✅ Easy to add/remove steps

### Reusability
- ✅ Form components can be reused elsewhere
- ✅ useContactForm hook can be adapted for other multi-step forms
- ✅ Progress component reusable for any wizard

### Performance
- ✅ Each step can use React.memo
- ✅ Smaller components = easier to optimize
- ✅ Lazy load steps if needed

## Testing Strategy

### Unit Tests
```typescript
// useContactForm.test.ts
describe('useContactForm', () => {
  it('should initialize with step 1', () => {
    const { result } = renderHook(() => useContactForm());
    expect(result.current.step).toBe(1);
  });

  it('should move to next step on valid data', () => {
    const { result } = renderHook(() => useContactForm());
    act(() => {
      result.current.updateFormData('fullName', 'John Doe');
      result.current.nextStep();
    });
    expect(result.current.step).toBe(2);
  });
});
```

### Integration Tests
```typescript
// ContactSection.test.tsx
describe('ContactSection', () => {
  it('should complete full form flow', async () => {
    render(<ContactSection />);

    // Fill step 1
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.click(screen.getByText('Next'));

    // Fill step 2
    // ...

    // Submit
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
  });
});
```

## Migration Strategy

### Option A: Big Bang (Not Recommended)
- Replace entire component at once
- High risk of breaking functionality
- Difficult to test incrementally

### Option B: Gradual Migration (Recommended ✅)
1. **Week 1**: Extract useContactForm hook, keep same UI
2. **Week 2**: Create and test reusable form components
3. **Week 3**: Split into step components, render conditionally
4. **Week 4**: Extract progress and footer, add tests
5. **Week 5**: Final cleanup, documentation, remove old code

## Risk Mitigation

### Before Starting
- ✅ Ensure all current functionality is documented
- ✅ Add integration tests to current implementation
- ✅ Create feature flag for new vs old form

### During Migration
- ✅ Keep old component as fallback
- ✅ Test each phase thoroughly
- ✅ Get code reviews for each PR
- ✅ Monitor analytics for form submission rates

### After Migration
- ✅ A/B test old vs new for 1 week
- ✅ Monitor error rates
- ✅ Collect user feedback
- ✅ Remove old code after validation

## Estimated Effort

- **Planning & Setup**: 2 hours
- **Phase 1 (Hook)**: 2 hours
- **Phase 2 (Components)**: 3 hours
- **Phase 3 (Steps)**: 4 hours
- **Phase 4 (Progress/Footer)**: 1 hour
- **Phase 5 (Orchestrator)**: 1 hour
- **Testing**: 4 hours
- **Documentation**: 2 hours
- **Review & Cleanup**: 2 hours

**Total**: ~21 hours (3 days)

## Decision: Defer to Future Sprint

**Reasoning**:
1. Current form works perfectly ✅
2. All security measures in place ✅
3. Validation robust ✅
4. Refactor is cosmetic/architectural, not functional
5. High risk vs medium reward
6. Better to focus on new features first

**Recommendation**:
- Document this plan ✅ (this file)
- Add to technical debt backlog
- Schedule for next major release
- Focus on features that add user value first

## Current Status: ✅ DOCUMENTED, DEFERRED

This refactor should be done when:
- Adding new form functionality
- Before adding similar multi-step forms
- During a dedicated tech debt sprint
- After user-facing features are complete
