import { IsNotEmpty, IsObject, ValidateIf, IsOptional, IsString, ValidateNested, IsBoolean } from "class-validator";
import { Types } from "mongoose";
import { ACTIVE, DEACTIVE } from "../common/constant";
class Performance {
    @IsNotEmpty()
    label!: string

    @IsNotEmpty()
    value!: string
}

export class AddEducation {
    @IsNotEmpty()
    degreeType!: string


    @IsNotEmpty()
    summary!: string

    @IsObject()
    @ValidateNested()
    performance!: Performance

    @IsString()
    userId!: Types.ObjectId
}

export class EditOrDeleteEducation {
    @IsNotEmpty()
    educationId!: Types.ObjectId
    @ValidateIf((obj) =>
        !obj.summaryId
        && !obj.performanceId &&
        ![ACTIVE, DEACTIVE].includes(obj.active))
    @IsNotEmpty()
    degreeType!: string

    @IsOptional()
    summaryId!: Types.ObjectId

    @ValidateIf((obj) =>
        obj.summaryId &&
        ![ACTIVE, DEACTIVE].includes(obj.active))
    @IsNotEmpty()
    summary!: string

    @IsOptional()
    performanceId!: Types.ObjectId

    @ValidateIf((obj) =>
        obj.performanceId &&
        ![ACTIVE, DEACTIVE].includes(obj.active))
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    performance!: Performance

    @IsString()
    userId!: Types.ObjectId

    @ValidateIf((obj) => !obj.degreeType && !obj.summary && !obj.performance)
    @IsBoolean()
    active!: boolean
}

