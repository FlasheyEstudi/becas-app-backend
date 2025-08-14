	import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
	import { Observable } from 'rxjs';
	import { AuthService } from './auth.service';
	@Injectable()
	export class LocalAuthGuard implements CanActivate {
	  constructor(private readonly authService: AuthService) {}
	  canActivate(
	    context: ExecutionContext,
	  ): boolean | Promise<boolean> | Observable<boolean> {
	    const request = context.switchToHttp().getRequest();
	    return this.validateRequest(request);
	  }
	  async validateRequest(request: any): Promise<boolean> {
	    const { identifier, password } = request.body;
	    if (!identifier || !password) {
	      return false;
	    }
	    const user = await this.authService.validateCredentials(identifier, password);
	    if (user) {
	      request.user = user;
	      return true;
	    }
	    return false;
	  }
	}