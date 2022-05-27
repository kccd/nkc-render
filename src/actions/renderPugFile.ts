import {Context} from 'moleculer';
import {RenderPug} from '../services/render';

export default {
  params: {
    file: {
      type: 'string',
      min: 1,
    },
    state: {
      type: 'object',
    },
    data: {
      type: 'object',
    },
  },
  handler(ctx: Context) {
    const {file, state, data} = ctx.params as {
      file: string;
      state: object;
      data: object;
    };
    return RenderPug(file, state, data);
  },
};
