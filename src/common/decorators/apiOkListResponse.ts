import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

import { ListResDto } from '@/common/dtos/listRes.dto';

export const ApiOkListResponse = <T extends Type<any>>(
  resDto: T,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(ListResDto, resDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(resDto) },
              },
            },
          },
        ],
      },
      ...options,
    }),
  );
};
