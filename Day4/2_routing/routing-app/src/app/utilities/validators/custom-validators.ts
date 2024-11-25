import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

export class CustomValidators {
    static ageRange(min = 18, max = 60): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value !== '' && (isNaN(control.value) || control.value < min || control.value > max)) {
                return { 'ageRange': true };
            } else {
                return null;
            }
        }
    }

    private static takenUsernames = [
        'manish',
        'manishs',
        'manishsharma',
        'manish.sharma',
        'manish_sharma'
    ];

    private static checkIfUsernameExists(username: string): Observable<boolean> {
        // HTTP API CALL to check Username Status
        return of(CustomValidators.takenUsernames.includes(username)).pipe(delay(1000));
    }

    static usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return CustomValidators.checkIfUsernameExists(control.value).pipe(
                map(res => {
                    return res ? { 'usernameExists': true } : null
                })
            );
        }
    }
}