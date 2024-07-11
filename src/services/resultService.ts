import Result, { IOverallStats, IResult } from '@models/Result';
import { IUser } from '@models/User';

export const createResult = async (resultData: IResult): Promise<IResult | null> => {
  const result = new Result(resultData);
  await result.save();
  return getResultById(result.id);
};

export const getResultById = async (resultId: string): Promise<IResult | null> => {
  return await Result.findById(resultId).exec();
};

export const updateResult = async (resultId: string, resultData: Partial<IResult>): Promise<IResult | null> => {
  console.log(resultId);
  
  return await Result.findByIdAndUpdate(resultId, resultData, { new: true, runValidators: true }).exec();
};

export const deleteResult = async (resultId: string): Promise<void> => {
  await Result.findByIdAndDelete(resultId).exec();
};

export const getResults = async (userId: IUser['_id']): Promise<IResult[]> => {
  return await Result.find({ createdBy: userId }).exec();
};


export const getOverallStats = async (): Promise<IOverallStats> => {
  const results = await Result.aggregate([
    {
      $facet: {
        topGrade: [
          { $sort: { grade: -1 } },
          { $limit: 1 },
          { $project: { studentName: 1, subjectId: 1, grade: 1 } }
        ],
        lowGrade: [
          { $sort: { grade: 1 } },
          { $limit: 1 },
          { $project: { studentName: 1, subjectId: 1, grade: 1 } }
        ],
        mostPassedSubject: [
          { 
            $group: {
              _id: '$subjectId',
              passCount: {
                $sum: {
                  $cond: [{ $ne: ['$grade', 'F'] }, 1, 0]
                }
              }
            }
          },
          { $sort: { passCount: -1 } },
          { $limit: 1 }
        ],
        mostFailedSubject: [
          { 
            $group: {
              _id: '$subjectId',
              failCount: {
                $sum: {
                  $cond: [{ $eq: ['$grade', 'F'] }, 1, 0]
                }
              }
            }
          },
          { $sort: { failCount: -1 } },
          { $limit: 1 }
        ]
      }
    }
  ]).exec();

  const topGrade = results[0].topGrade[0];
  const lowGrade = results[0].lowGrade[0];
  const mostPassedSubject = results[0].mostPassedSubject[0];
  const mostFailedSubject = results[0].mostFailedSubject[0];

  return {
    topGrade: {
      studentName: topGrade.studentName,
      subjectId: topGrade.subjectId,
      grade: topGrade.grade
    },
    lowGrade: {
      studentName: lowGrade.studentName,
      subjectId: lowGrade.subjectId,
      grade: lowGrade.grade
    },
    mostPassedSubject: {
      subjectId: mostPassedSubject._id,
      passCount: mostPassedSubject.passCount
    },
    mostFailedSubject: {
      subjectId: mostFailedSubject._id,
      failCount: mostFailedSubject.failCount
    }
  };
};