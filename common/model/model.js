export const DailyItems = [
  {
    name: 'garbageCollection',
    title: 'Garbage Collection',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorSweeping',
    title: 'Corridor Sweeping',
    status: 'Completed',
    review: 'happy',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'corridorMopping',
    title: 'Corridor Mopping',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'liftFrontWallCleaning',
    title: 'List & Front Wall Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  }
];

export const WeeklyItems = [
  {
    name: 'terraceSweeping',
    title: 'Terrace Sweeping',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalRoomCleaning',
    title: 'Electrical Room Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'sewer',
    title: 'Sewer',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'electricalPanel',
    title: 'Electrical Panel',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];

// export const FortNiteItems = [
//   {
//     name: 'buildingDusting',
//     title: 'Building Dusting',
//     status: 'Open',
//     review: null,
//     apartmentID: 1,
//     userID: 1,
//     createDate: new Date(),
//     modifiedDate: new Date(),
//   },
//   {
//     name: 'floorScrubbing',
//     title: 'Floor Scrubbing',
//     status: 'Completed',
//     review: 'sad',
//     apartmentID: 1,
//     userID: 1,
//     createDate: new Date(),
//     modifiedDate: new Date(),
//   },
//   {
//     name: 'stpRoomCleaning',
//     title: 'STP Room Cleaning',
//     status: 'Open',
//     review: null,
//     apartmentID: 1,
//     userID: 1,
//     createDate: new Date(),
//     modifiedDate: new Date(),
//   },
// ];

export const FortNiteItems = [
  {
    name: 'buildingDusting',
    title: 'Building Dusting',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'floorScrubbing',
    title: 'Floor Scrubbing',
    status: 'Completed',
    review: 'sad',
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
  {
    name: 'stpRoomCleaning',
    title: 'STP Room Cleaning',
    status: 'Open',
    review: null,
    apartmentID: 1,
    userID: 1,
    createDate: new Date(),
    modifiedDate: new Date(),
  },
];

export const ManagerData = [
  {
    name: 'daily',
    title: 'DAILY',
    ticketCount: '45',
    happyPercent: '60',
    normalPercent: '20',
    sadPercent: '20',
  },
  {
    name: 'weekly',
    title: 'WEEKLY',
    ticketCount: '23',
    happyPercent: '70',
    normalPercent: '20',
    sadPercent: '10',
  },
  {
    name: 'fortNite',
    title: 'FORTNITE',
    ticketCount: '12',
    happyPercent: '82',
    normalPercent: '15',
    sadPercent: '03',
  },
];

export const OtherItems = [{
  name: 'others',
  title: 'Others',
  status: 'Open',
  review: null,
  apartmentID: 1,
  userID: 1,
  createDate: new Date(),
  modifiedDate: new Date(),
}]


export const appModel = (state) => {
  return {
    isAuthenticated: () => {
      return state.isAuthenticated;
    },
    getUserID: () => {
      return state.user.id;
    },
    getUser() {
      const user = state.user
      return {
        name: user.name,
        userID: user.id,
        password: user.password,
        roles: user.roles,
        mobileNo: user.mobileNo,
        apartmentID: user.apartmentID,
      }
    },
    // getApartmentsID: () => {
    //   return state.apartmentID;
    // },
    setApartments: (d) => {
      state.apartments = d;
    },
    getApartments: (d) => {
      return state.apartments;
    },
    // setApartments: (d) => {
    //     _model.apartments = d;
    // },

    // setApartmentsTaskInfo: (d) => {
    //     _model.apartmentsInfo = d;
    // },

    getApartmentInfoById: (id) => state.apartmentsInfo[id],
    getApartmentTasksById: (id) => {
      const apartment = state.apartmentsInfo[id];

      return {
        dailyTasks: apartment.dailyTasks,
        weeklyTasks: apartment.weeklyTasks,
        fortNiteTasks: apartment.fortNiteTasks,
        otherTasks: apartment.otherTasks
      };

    },
    getApartmentsInfo: () => state.apartmentsInfo,

    // setApartmentTickets: (d) => {
    //     _model.apartmentTickets = d;
    // },

    isSecretary: () => {
      return state.user.roles.indexOf('secretary') >= 0;
    },
    isManager: () => {
      return state.user.roles.indexOf('manager') >= 0;
    },
    getApartmentsID: () => {
      if (state.user.roles.indexOf('secretary') >= 0) {
        return [state.user.apartmentID[0]];
      }
      return state.user.apartmentID;
    },

    getApartmentTickets: (apartmentID) => {
      return state.apartmentTickets.filter(d => d.apartmentID === apartmentID);
    },
    getApartmentDailyTasks: (apartmentID) => {
      return state.apartmentDailyTasks.filter(d => d.apartmentID === apartmentID);
    },
    getApartmentWeeklyTasks: (apartmentID) => {
      return state.apartmentWeeklyTasks.filter(d => d.apartmentID === apartmentID);
    },
    getApartmentFortNiteTasks: (apartmentID) => {
      return state.apartmentFortNiteTasks.filter(d => d.apartmentID === apartmentID);
    },
    addTicket: (d) => {
      state.apartmentTickets.unshift(d);
    },
  }
}