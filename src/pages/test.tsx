import { createPage } from "../utils/nextjs";

import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "@hello-pangea/dnd";
import { DragDropContextProps } from "@hello-pangea/dnd";
import AppLayout from "../components/AppLayout";
import TodoLayout from "../features/todos/TodoLayout";
import TodoListCard from "../features/todos/TodoListCard";
import { Todo } from "@prisma/client";
import { useQuery, useTrpcCtx } from "../utils/trpc";

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: Todo = {
    id: `id-${k}`,
    name: `Todo ${k}`,
    order: k,
    description: "hi",
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),

  };

  return custom;
});

const grid = 8;
const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed!);

  return result;
};

// function Quote({ quote, index }: {quote: Todo, index: number}) {
//   return (
//     <Draggable draggableId={quote.id} index={index}>
//       {provided => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//         >
//           {quote.content}
//         </div>
//       )}
//     </Draggable>
//   );
// }

// const QuoteList = React.memo(function QuoteList({ quotes }: {quotes: Quote[]}) {
//   return quotes.map((quote: Quote, index: number) => (
//     <Quote quote={quote} index={index} key={quote.id} />
//   ));
// });
const Page = () => {
    const trpcContext = useTrpcCtx()

    const [todos, setTodos] = useState(trpcContext.getQueryData(["todo.getAll"])!)

  
    const onDragEnd: DragDropContextProps["onDragEnd"] = (result) => {
        if (!result.destination) {
            return;
        }
    
        if (result.destination.index === result.source.index) {
            return;
        }
    
        const reorderedTodos = reorder(
            todos!,
            result.source.index,
            result.destination.index
        );
  
    //   trpcContext.setQueryData(["todo.getAll"], reorderedTodos)
        setTodos(reorderedTodos)
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <ul className="flex flex-col"
            ref={provided.innerRef} 
            {...provided.droppableProps}
            >
                {/* <QuoteList quotes={state.quotes} /> */}
                {todos.map((todo, index: number) => (
                    // <Quote quote={quote} index={index} key={quote.id} />
                    <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided, snapshot) => (
                            <li 
                            className="mb-4"
                            ref={provided.innerRef} 
                            {...provided.dragHandleProps} 
                            {...provided.draggableProps}
                            >
                                <TodoListCard todo={todo} />
                            </li>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

export default createPage(() => {
    const {isLoading, data, refetch: refetchTodos} = useQuery(["todo.getAll"])


    if (isLoading || !data) return <div>Fetching</div>

    return <Page/>
}, {
    layout: AppLayout,
    subLayout: TodoLayout,
})

// export const getServerSideProps = () => {
//     return {props: {}}
// }