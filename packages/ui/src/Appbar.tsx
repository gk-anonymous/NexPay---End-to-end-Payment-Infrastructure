import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // Fixed the types here.
  // Since these are function handlers that don't return anything, '() => void' is correct.
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    // Added bg-white to ensure the background is white as requested
    <div className="flex justify-between border-b px-4 border-slate-300 bg-white items-center h-14">
      {/* LOGO SECTION */}
      <div className="flex flex-col justify-center cursor-pointer">
        <div className="flex items-center gap-2">
          {/* Custom SVG Icon in Purple */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-8 h-8 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          {/* Text Logo: Black start, Purple end */}
          <span className="text-2xl font-bold text-black tracking-tight">
            Nex<span className="text-purple-600">Pay</span>
          </span>
        </div>
      </div>

      {/* BUTTON SECTION */}
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
