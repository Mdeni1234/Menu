import { FormGroup } from'@angular/forms';

export function MustMatch( controlName1, controlName2) {
    return(formGroup: FormGroup) => {
        const control = formGroup.controls[controlName1];
        const control2 = formGroup.controls[controlName2];

        if (control.value <= control2.value) {
            control.setErrors(null)
        } else {
            control.setErrors({MustMatch : true})
        }
    }
}