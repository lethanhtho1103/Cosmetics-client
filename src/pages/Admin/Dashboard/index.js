import { useState } from 'react';
import AdminLayout from '~/layouts/AdminLayout';

// Import Material UI Icons
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';

// Import CSS
import './Dashboard.scss';

function Dashboard() {
  const [data, setData] = useState({
    player_number: 50,
    coach_number: 10,
    customer_number: 200,
    company_number: 15,
  });

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="card-container">
          {/* Players Card */}
          <div className="card player-card">
            <div className="icon-container icon-person">
              <PersonIcon />
            </div>
            <div>
              <div className="card-number">{data?.player_number}</div>
              <div className="card-title">Players</div>
            </div>
          </div>

          {/* Coaches Card */}
          <div className="card coach-card">
            <div className="icon-container icon-group">
              <GroupIcon />
            </div>
            <div>
              <div className="card-number">{data?.coach_number}</div>
              <div className="card-title">Coaches</div>
            </div>
          </div>

          {/* Users Card */}
          <div className="card user-card">
            <div className="icon-container icon-person">
              <PersonIcon />
            </div>
            <div>
              <div className="card-number">{data?.customer_number}</div>
              <div className="card-title">Users</div>
            </div>
          </div>

          {/* Companies Card */}
          <div className="card company-card">
            <div className="icon-container icon-business">
              <BusinessIcon />
            </div>
            <div>
              <div className="card-number">{data?.company_number}</div>
              <div className="card-title">Company</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
