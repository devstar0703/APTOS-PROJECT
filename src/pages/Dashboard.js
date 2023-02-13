import * as React from 'react';


import { useTheme } from '@mui/styles';


import { 
    DashboardMain, 
} from './styles/Dashboard.styles';

import NFTTable from 'src/components/Dashboard/NFTTable';

const Dashboard = (props) => {
  
    const theme = useTheme() ;

    return (
        <DashboardMain>
            <NFTTable />            
        </DashboardMain>
    )
}

export default Dashboard;