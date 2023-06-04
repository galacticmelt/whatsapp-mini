export type ContactInfoState = {
  chatId: string;
  name: string;
  phoneNumber: string;
  hasWhatsApp: boolean;
  contactLoading: boolean;
  contactError: {
    status: boolean;
    value: null | any;
  };
};
