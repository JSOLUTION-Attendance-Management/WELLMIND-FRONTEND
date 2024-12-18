import { Provider } from 'react-redux'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { Routes } from '@/routes'
import { store } from '@/store/store'

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
