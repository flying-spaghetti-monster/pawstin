import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
// import { Types } from 'mongoose';
// import { ID_VALIDATION_ERROR } from './ad-validation.constants';

@Injectable()
export class RoleValidationPipe implements PipeTransform {
	transform(value: string, metadata: ArgumentMetadata) {
		console.log(value)
		console.log(metadata)
		// if (metadata.type != 'param') {
		// 	return value;
		// }
		// if (!Types.ObjectId.isValid(value)) {
		// 	throw new BadRequestException(ID_VALIDATION_ERROR);
		// }
		return value;
	}
}