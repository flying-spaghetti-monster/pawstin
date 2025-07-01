import { PageDirection } from '../../../../lib/types';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function PaginationControls({ 
    totalNumberOfPages,
    currentPage,
    onClick 
  }: { 
    totalNumberOfPages: number ,
    currentPage: number ,
    onClick: (direction: PageDirection) => void 
  }) {


  return (
    <section className="pagination flex items-center justify-between align-items p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 dark:text-gray-400">

      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition  px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300  pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <KeyboardBackspaceIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightAltIcon />
        </>
      )}
    </button>
  );
}
