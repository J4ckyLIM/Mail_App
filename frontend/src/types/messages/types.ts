export type Message = {
  id: string;
  title: string;
  content: string;
  writtenBy: string;
  writtenTo: string;
  sentAt: Date;
  hasBeenRead: boolean;
};
