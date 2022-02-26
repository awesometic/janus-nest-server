import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class RemoveUserDto extends PartialType(
  PickType(CreateUserDto, ["email", "password"])
) { }
