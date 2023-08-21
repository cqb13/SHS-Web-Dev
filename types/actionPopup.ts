interface ActionPopup {
  title: string;
  message: string;
  inputVisible: boolean;
  expectedInput: string;
  confirmText: string;
  onConfirm: void;
  cancelText: string;
  onCancel: () => void;
}

export default ActionPopup;
