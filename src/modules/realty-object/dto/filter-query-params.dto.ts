import { IsInt, IsOptional } from 'class-validator';

export class FilterQueryParamsDto {
  @IsInt()
  @IsOptional()
  public cursor?: number;

  @IsInt()
  @IsOptional()
  public take?: number;

  @IsInt()
  @IsOptional()
  public min_price?: number;

  @IsInt()
  @IsOptional()
  public max_price?: number;
}
