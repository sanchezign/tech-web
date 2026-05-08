import { Controller, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleDocument } from './schemas/article.schema';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(): Promise<ArticleDocument[]> {
    return this.articlesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<ArticleDocument> {
    return this.articlesService.findBySlug(slug);
  }
}
