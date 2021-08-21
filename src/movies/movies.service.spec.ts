import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { updateMovieDto } from './dto/update-movie-dto';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return movie", () => {
      service.addOne({
        title: 'title',
        genres: ['genre'],
        year: 2020
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try {
        service.getOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual("Movie with ID: 0 not found");
      }
    });
  });

  describe("deleteOne", () => {
    it("should delete movie", () => {
      service.addOne({
        title: 'title',
        genres: ['genre'],
        year: 2020
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });
    it("should return 404", () => {
      try {
        service.deleteOne(0);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("addOne", () => {
    it("should add movie", () => {
      const beforeAdd = service.getAll().length;
      service.addOne({
        title: 'title',
        genres: ['genre'],
        year: 2020
      });
      const afterAdd = service.getAll().length;
      expect(afterAdd).toEqual(beforeAdd + 1);
    });
  });

  describe("update", () => {
    it("should update movie", () => {
      service.addOne({
        title: 'title',
        genres: ['genre'],
        year: 2020
      });
      service.update(1, {title: "updated"});
      const afterUpdate = service.getOne(1);
      expect(afterUpdate.title).toEqual(afterUpdate.title);
    });
    it("should return 404", () => {
      try {
        service.update(0, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
