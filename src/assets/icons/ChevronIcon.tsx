const ChevronIcon = ({ color = '#717171' }: { color?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.52459 3.71209C6.8907 3.34597 7.4843 3.34597 7.85041 3.71209L13.4754 9.33709C13.8415 9.7032 13.8415 10.2968 13.4754 10.6629L7.85041 16.2879C7.4843 16.654 6.8907 16.654 6.52459 16.2879C6.15847 15.9218 6.15847 15.3282 6.52459 14.9621L11.4867 10L6.52459 5.03791C6.15847 4.6718 6.15847 4.0782 6.52459 3.71209Z"
        fill={color}
      />
    </svg>
  );
};

export default ChevronIcon;
