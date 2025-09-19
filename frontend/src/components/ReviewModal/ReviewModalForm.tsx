import type { ReviewSchemaType } from "@/schemas/schemas";
import type { UseFormReturn, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import RatingButton from "../ui/rating-buttons";

type ReviewModalFormProps = {
  form: UseFormReturn<ReviewSchemaType>;
  onSubmit: SubmitHandler<ReviewSchemaType>;
  isSubmitting: boolean;
};

export default function ReviewModalForm({
  form,
  onSubmit,
  isSubmitting,
}: ReviewModalFormProps): JSX.Element {
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2"
        >
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Autor</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avaliação</FormLabel>
                <FormControl>
                  <RatingButton
                    rating={field.value || 0}
                    onRatingChange={(newRating) => {
                      field.onChange(newRating);
                      field.onBlur();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentário</FormLabel>
                <FormControl>
                  <Textarea placeholder="Seu comentário..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="hover:cursor-pointer"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="hover:cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
