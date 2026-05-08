import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async findAll(): Promise<ArticleDocument[]> {
    return this.articleModel
      .find()
      .sort({ publishedAt: -1, createdAt: -1 })
      .exec();
  }

  async findBySlug(slug: string): Promise<ArticleDocument> {
    const article = await this.articleModel.findOne({ slug }).exec();
    if (!article) {
      throw new NotFoundException(`Article with slug "${slug}" not found`);
    }
    return article;
  }

  async create(dto: CreateArticleDto): Promise<ArticleDocument> {
    const created = new this.articleModel({
      ...dto,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null,
    });
    return created.save();
  }
}
