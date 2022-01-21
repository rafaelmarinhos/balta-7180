import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Contract } from "src/modules/backoffice/contracts/contract";
import { ResultDto } from "src/modules/backoffice/dtos/result.dto";

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
    constructor(public contract: Contract) {

    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.contract.validate(body);

        if (!valid) {

            var result = new ResultDto(
                'Ops, deu algo errado.',
                false,
                null,
                this.contract.errors);

            throw new HttpException(result, HttpStatus.BAD_REQUEST)
        }

        return next.handle();
    }
}