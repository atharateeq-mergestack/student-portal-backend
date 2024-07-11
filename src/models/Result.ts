import mongoose, { Schema, Document } from 'mongoose';
import { ISubject } from '@models/Subject';
import { IUser } from '@models/User';
import { MESSAGES } from '@utils/message';
import { Grade } from '@utils/enum';

export interface IResult extends Document {
  studentName: string;
  subjectId: ISubject['_id'];
  marks: number;
  grade: Grade;
  createdBy: IUser['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOverallStats {
  topGrade: {
    studentName: string;
    subjectId: ISubject['_id'];
    grade: string;
  };
  lowGrade: {
    studentName: string;
    subjectId: ISubject['_id'];
    grade: string;
  };
  mostPassedSubject: {
    subjectId: ISubject['_id'];
    passCount: number;
  };
  mostFailedSubject: {
    subjectId: ISubject['_id'];
    failCount: number;
  };
}
const ResultSchema: Schema = new Schema({
  studentName: {
    type: String,
    required: [true, `Student name${MESSAGES.IS_REQUIRED}`],
    validate: {
      validator: (value: string) => /^[a-zA-Z\s]+$/.test(value),
      message: `Student name${MESSAGES.ONLY_ALPHABETIC}`
    }
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, `Subject ID${MESSAGES.IS_REQUIRED}`]
  },
  marks: {
    type: Number,
    required: [true, `Marks${MESSAGES.IS_REQUIRED}`],
    min: [0, MESSAGES.MARKS_RANGE],
    max: [100, MESSAGES.MARKS_RANGE]
  },
  grade: {
    type: String,
    required: [true, `Grade${MESSAGES.IS_REQUIRED}`],
    enum: {
      values: Object.values(Grade),
      message: `Grade must be one of ${Object.values(Grade).join(', ')}`
    },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Created by${MESSAGES.IS_REQUIRED}`]
  }
}, {
  timestamps: true
});

export default mongoose.model<IResult>('Result', ResultSchema);
