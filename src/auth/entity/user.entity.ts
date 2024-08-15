import { modelOptions, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export class User extends TimeStamps{

    @prop({ required: true, unique: true })
    username!: string

    @prop({ required: true, type: String })
    password!: string

}