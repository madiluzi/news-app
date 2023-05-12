import { useState } from "react"

export default function Badge(props) {
    function classCheck(id){
        switch (id) {
            case 1:
              return 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'
            case 2:
              return 'bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300'
            case 3:
              return 'bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'
            default:
              return null
          }
    }
    return (
        <span className={classCheck(props.status.id)}>{props.status.title}</span>
    );
}
