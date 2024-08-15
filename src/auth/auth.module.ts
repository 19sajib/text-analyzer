import { Module } from '@nestjs/common';
import { config } from '../config'
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({
            secret: config.jwtSecretKey,
            signOptions: { expiresIn: config.jwtExpire },
          }),
        TypegooseModule.forFeature([User]), 
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
