const CloseIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.26315 0.26315C0.614017 -0.0877167 1.18288 -0.0877167 1.53375 0.26315L6.28916 5.01856L11.0446 0.26315C11.3954 -0.0877167 11.9643 -0.0877167 12.3152 0.26315C12.666 0.614017 12.666 1.18288 12.3152 1.53375L7.55976 6.28916L12.3152 11.0446C12.666 11.3954 12.666 11.9643 12.3152 12.3152C11.9643 12.666 11.3954 12.666 11.0446 12.3152L6.28916 7.55976L1.53375 12.3152C1.18288 12.666 0.614017 12.666 0.26315 12.3152C-0.0877167 11.9643 -0.0877167 11.3954 0.26315 11.0446L5.01856 6.28916L0.26315 1.53375C-0.0877167 1.18288 -0.0877167 0.614017 0.26315 0.26315Z"
        fill="white"
      />
    </svg>
  );
};

export default CloseIcon;
