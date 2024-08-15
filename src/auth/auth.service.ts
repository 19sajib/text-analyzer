import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './entity/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
        private jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ username })
        if (!user) throw new HttpException("No user found with this username...", HttpStatus.FORBIDDEN)
            
        if(user && user.password == password) {
            const { password, ...result } = user
            return result
        } else {
            throw new HttpException("Invalid credentials...", HttpStatus.FORBIDDEN)
        }

    }

    async login(user: any): Promise<any>{
        const payload = { username: user.username, sub: user._id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }

    async register(username: string, password: string): Promise<any> {
        const existingUser = await this.userModel.findOne({ username })
        if (existingUser) throw new HttpException("There is a register user with that username try login", HttpStatus.FORBIDDEN)
        
        const user = await this.userModel.create({ username, password })
        const payload = { username: user.username, sub: user._id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }
}
