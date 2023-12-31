import {
  IsInt,
  IsNumber,
  IsOptional,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isIntArray', async: false })
export class IsIntArray implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    if (!value) return true;

    if (!Array.isArray(value)) {
      return false;
    }

    return value.every((item) => Number.isInteger(item));
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be an array of integers`;
  }
}

export class FilterQueryParamsDto {
  @IsInt()
  @IsOptional()
  public offset?: number;

  @IsInt()
  @IsOptional()
  public limit?: number;

  @IsInt()
  @IsOptional()
  public min_price?: number;

  @IsInt()
  @IsOptional()
  public max_price?: number;

  @IsNumber()
  @IsOptional()
  public min_area?: number;

  @IsNumber()
  @IsOptional()
  public max_area?: number;

  @IsInt()
  @IsOptional()
  public min_floor?: number;

  @IsInt()
  @IsOptional()
  public max_floor?: number;

  @IsOptional()
  public benefits: string;

  @IsInt()
  @IsOptional()
  public furnish: number;

  @IsInt()
  @IsOptional()
  public property: number;

  @IsOptional()
  public rooms: string;

  @IsOptional()
  public type: string;

  @IsOptional()
  public sort: string;

  @IsOptional()
  public order: 'asc' | 'desc';
}
