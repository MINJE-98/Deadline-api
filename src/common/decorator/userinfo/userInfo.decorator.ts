import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfo = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    // if (process.env.NODE_ENV == 'dev') {
    //   const testData = {
    //     socialId: process.env.KAKAO_ID,
    //     name: process.env.KAKAO_NAME,
    //     profileUrl: process.env.KAKAO_PROFILE,
    //     email: process.env.KAKAO_EMAIL,
    //   };
    //   return data ? testData?.[data] : testData;
    // }
    const user = req.headers;
    return data ? user?.[data] : user;
  },
);
