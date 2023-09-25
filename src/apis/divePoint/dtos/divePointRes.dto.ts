import DivePoint from 'src/entities/DivePoint';

export class DivePointResDto {
  id: number;

  name: string;

  description: string;

  countryCode: string;

  location: string;

  recommendation: number;

  averageStar: number;

  static async makeRes(data: DivePoint) {
    const resDto = new DivePointResDto();

    resDto.id = data.id;
    resDto.name = data.name;
    resDto.description = data.description;
    resDto.countryCode = data.countryCode;
    resDto.location = data.location;
    resDto.recommendation = data.recommendation;
    resDto.averageStar = data.averageStar;

    return resDto;
  }
}
