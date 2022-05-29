import { IsString, IsNotEmpty, IsEmail, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsEmail({}, { message: "El correo no es valido" })
  @IsNotEmpty({ message: "El correo es requerido" })
  @ApiProperty()
  readonly email: string;

  @IsString({ message: "La contraseña debe contener texto" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  @MaxLength(10, { message: "La contraseña debe tener un máximo de 10 caracteres" })
  @ApiProperty()
  readonly password: string;
}
