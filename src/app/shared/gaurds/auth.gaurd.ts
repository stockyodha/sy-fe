import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root' // Ensure the service is provided in the root
})
class PermissionsService {
    constructor(private userService: UserService, private router: Router) {}

    async canActivate(): Promise<boolean> {
        const result = await this.userService.onMe();
        console.log('Result', result);
        if (result.errors || result.data == null) {
            console.log('Apollo errors', result.error?.graphQLErrors);
            console.log('Network errors', result.error?.networkError);
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}

export const CanActivateTeam: CanActivateFn = async (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
): Promise<boolean> => {
    const permissionsService = inject(PermissionsService);
    return await permissionsService.canActivate();
};
