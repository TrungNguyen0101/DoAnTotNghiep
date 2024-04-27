import React, {lazy, useEffect, useState} from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Bar} from 'react-chartjs-2';
import MainChartExample from '../charts/MainChartExample.js'
import axios from "axios";
import Auth from "../pages/service/Auth";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
  const [dataChart, setDataChart] = useState({});
  const [currentUser] = useState(Auth.getCurrentUser());

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const res = await axios.get(
          `https://backend-kide.herokuapp.com/api/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.accessToken}`,
            },
          }
        );
        const {data} = res;
        if (data) {
          console.log(data)

          const arrCreatedAt = data.map(item => {
            const split = item.createdAt.split('/');
            return split[1];
          })
          const countMonth = arrCreatedAt.reduce(function (prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            console.log(prev[cur])
            return prev;
          }, {});

          console.log(countMonth["05"])

          setDataChart({
            labels: [
              'January', 'February', 'March',
              'April', 'May', 'June', 'July',
              'August', 'September', 'October',
              'November', 'December'],
            datasets: [
              {
                label: 'The number of users',
                backgroundColor: '#dc3545',
                borderColor: '#dc3545',
                borderWidth: 2,
                data: [
                  countMonth["01"],
                  countMonth["02"],
                  countMonth["03"],
                  countMonth["04"],
                  countMonth["05"],
                  countMonth["06"],
                  countMonth["07"],
                  countMonth["08"],
                  countMonth["09"],
                  countMonth["10"],
                  countMonth["11"],
                  countMonth["12"],

                ]
              }
            ]
          })
        }
      } catch (e) {
      }
    }

    fetchMyAPI();
  }, []);

  return (
    <>
      <WidgetsDropdown/>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="2"></CCol>
            <CCol sm="8">
              <Bar
                data={dataChart}
                options={{
                  title: {
                    display: true,
                    text: 'Average Rainfall per month',
                    fontSize: 20
                  },
                  legend: {
                    display: true,
                    position: 'right'
                  }
                }}
              />
            </CCol>
            <CCol sm="2"></CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
