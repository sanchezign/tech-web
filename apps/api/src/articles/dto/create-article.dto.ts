import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase letters, numbers and hyphens only',
  })
  @MaxLength(250)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  summary: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }: { value: unknown }) =>
    Array.isArray(value)
      ? (value as unknown[])
          .map((t) => String(t).trim())
          .filter(Boolean)
      : [],
  )
  tags?: string[];

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
