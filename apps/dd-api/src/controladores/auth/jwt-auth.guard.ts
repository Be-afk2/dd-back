import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Strategy } from "passport-jwt";
import { ExecutionContext } from '@nestjs/common';


@Injectable()

export class JwtAuthGuard extends AuthGuard('jwt') {
}