import { messageFactory } from '../../domain/message/message.factory';
import { seedUsers } from '../users/seed-users';

export const seedMessages = [
  messageFactory({
    title: 'Lorem ipsum dolor sit amet.',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ipsum elit, egestas non sagittis vel, facilisis nec odio. Curabitur augue felis, mollis non facilisis quis, volutpat ac elit. Integer in egestas nisi, eget mattis mi. Nam consequat purus quam, et efficitur diam placerat vel. Donec porttitor magna sit amet dolor molestie faucibus. Mauris id ullamcorper nisi. Nam nunc arcu, malesuada vel rutrum non, feugiat nec nisi. Ut malesuada nisi at viverra elementum. Aenean eget ligula odio. Nullam at finibus est. Suspendisse tincidunt et libero tristique molestie. Etiam consectetur lorem sed risus egestas, at condimentum nunc laoreet.',
    writtenBy: seedUsers[1],
    writtenTo: seedUsers[0],
  }),
  messageFactory({
    title: 'Nulla facilisi.',
    content:
      'Nulla facilisi. Sed nec enim vitae leo tincidunt tincidunt. Nulla facilisi. Nullam euismod, nisi eget fringilla consectetur, augue urna placerat libero, eget lobortis dolor est a arcu. Sed sed nulla vitae odio rhoncus eleifend. Nulla facilisi. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl.',
    writtenBy: seedUsers[1],
    writtenTo: seedUsers[0],
  }),
  messageFactory({
    title: 'Sed nec enim vitae leo tincidunt tincidunt.',
    content:
      'Sed nec enim vitae leo tincidunt tincidunt. Nulla facilisi. Nullam euismod, nisi eget fringilla consectetur, augue urna placerat libero, eget lobortis dolor est a arcu. Sed sed nulla vitae odio rhoncus eleifend. Nulla facilisi. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl.',
    writtenBy: seedUsers[2],
    writtenTo: seedUsers[0],
  }),
  messageFactory({
    title: 'Nullam euismod, nisi eget fringilla consectetur.',
    content:
      'Nullam euismod, nisi eget fringilla consectetur, augue urna placerat libero, eget lobortis dolor est a arcu. Sed sed nulla vitae odio rhoncus eleifend. Nulla facilisi. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl.',
    writtenBy: seedUsers[2],
    writtenTo: seedUsers[0],
  }),
  messageFactory({
    title: 'Donec euismod, ante sed luctus ultrices.',
    content:
      'Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl. Donec euismod, ante sed luctus ultrices, leo nisl aliquam risus, non aliquam nibh velit a nisl.',
    writtenBy: seedUsers[2],
    writtenTo: seedUsers[0],
  }),
];
