import { EllipsisVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import type { Review } from "@/types/types";

type ReviewCardActionsProps = {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
};

const ReviewCardActions = ({
  review,
  onDelete,
  onEdit,
}: ReviewCardActionsProps): JSX.Element => {
  return (
    <>
      {/* Actions */}
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="hover:cursor-pointer">
              <EllipsisVertical className="h-5 w-5" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent align="start" className="text-xs">
            <p>Ações</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="hover:cursor-pointer font-light py-2"
            onClick={() => onEdit(review)}
          >
            <Edit /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:cursor-pointer font-light py-2"
            onClick={() => onDelete(review._id)}
          >
            <Trash2 /> Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default ReviewCardActions;
