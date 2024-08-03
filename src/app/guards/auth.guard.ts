import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

const authService = () => inject(SupabaseService);

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  const { data } = await authService().session();

  if (!data.session) {
    router.navigateByUrl('/Login');
  }

  return !!data.session;

};
