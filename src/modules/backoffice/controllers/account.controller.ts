import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";
import { AuthenticateDto } from "../dtos/customer/account/authenticate.dto";
import { ResultDto } from "../dtos/result.dto";
import { AccountProvider } from "../providers/account.provider";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private authService: AuthService,
        private accountService: AccountProvider
    ) {

    }

    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        // // Caso não encontre o usuário
        // if (!customer)
        //     throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);

        // // Caso o usuário esteja inativo
        // if (!customer.user.active)
        //     throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);

        // // Gera o token
        // const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        // return new ResultDto(null, true, token, null);
    }
}