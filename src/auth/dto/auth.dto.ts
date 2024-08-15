import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class AuthDTO {
    @ApiProperty({ type: String, required: true, example: 'john_doe' })
    @IsString()
    username: string;

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
        message: "Password must be between 8 and 16 characters long with 1 upper case and lower case character each"
    })
    @ApiProperty({ type: String, required: true, example: 'Wx123xcv' })
    password: string;
}