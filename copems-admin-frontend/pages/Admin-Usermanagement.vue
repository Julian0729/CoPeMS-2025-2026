<template>
  <div>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 100%"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
          />
          <div>
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <v-container
      class="pa-6"
      style="background-color: #ffffff; max-width: 1200px; margin-top: 88px"
    >
      <v-row align="center" class="mb-3">
        <v-col class="py-0">
          <h1 class="text-h5 font-weight-bold" style="color: black">
            User Management System
          </h1>
          <p class="text-body-2 mt-1" style="color: #666">
            Manage government personnel and engineering professionals
          </p>
        </v-col>

        <v-col cols="auto" class="py-0">
          <v-btn color="#0000CC" dark @click="addUser">
            <v-icon left>mdi-plus</v-icon>
            ADD NEW USER
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>

      <v-row class="mb-4">
        <v-col cols="12" md="4">
          <v-card
            class="pa-3 d-flex align-center"
            outlined
            :style="{
              cursor: 'pointer',
              backgroundColor: filterStatus === null ? '#e3f2fd' : 'white',
              borderColor: filterStatus === null ? '#0000CC' : '#ccc',
              borderWidth: filterStatus === null ? '2px' : '1px',
            }"
            @click="setFilter(null)"
          >
            <v-icon size="32" color="purple" class="mr-3"
              >mdi-account-group-outline</v-icon
            >
            <div>
              <div class="text-caption grey--text">Total Users</div>
              <div class="text-h6 font-weight-bold">{{ users.length }}</div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card
            class="pa-3 d-flex align-center"
            outlined
            :style="{
              cursor: 'pointer',
              backgroundColor: filterStatus === 'Active' ? '#e3f2fd' : 'white',
              borderColor: filterStatus === 'Active' ? '#0000CC' : '#ccc',
              borderWidth: filterStatus === 'Active' ? '2px' : '1px',
            }"
            @click="setFilter('Active')"
          >
            <v-icon size="32" color="green darken-1" class="mr-3"
              >mdi-account-check-outline</v-icon
            >
            <div>
              <div class="text-caption grey--text">Active Users</div>
              <div class="text-h6 font-weight-bold">
                {{ users.filter((u) => u.status === "Active").length }}
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="search"
            label="Search users..."
            prepend-inner-icon="mdi-magnify"
            solo
            clearable
            hide-details
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="my-3"></v-divider>

      <v-card class="elevation-2">
        <v-toolbar color="white" flat dense>
          <v-icon color="#0000CC" class="me-2"
            >mdi-account-box-multiple-outline</v-icon
          >
          <v-toolbar-title
            class="font-weight-medium text-body-2"
            style="color: black"
            >Personnel Directory</v-toolbar-title
          >
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :search="search"
          :hide-default-footer="false"
          class="elevation-0"
        >
          <template v-slot:header="{ column }">
            <div
              class="text-left text-uppercase text-caption font-weight-bold"
              style="color: #0000cc"
            >
              {{ column.title }}
            </div>
          </template>

          <template v-slot:[`item.name`]="{ item }">
            <div class="d-flex align-center py-2">
              <v-avatar
                size="36"
                color="blue-grey lighten-3"
                class="white--text font-weight-bold mr-3"
              >
                {{ item.initials }}
              </v-avatar>
              <span>{{ item.name }}</span>
            </div>
          </template>

          <template v-slot:[`item.role`]="{ item }">
            <v-chip :color="roleColor(item.role)" small outlined>
              {{ item.role }}
            </v-chip>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <v-icon
              :color="item.status === 'Active' ? 'green' : 'grey'"
              size="large"
              class="mr-1"
              >mdi-circle</v-icon
            >
            <span
              :class="item.status === 'Active' ? 'green--text' : 'grey--text'"
              >{{ item.status }}</span
            >
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              :color="item.status === 'Active' ? 'green' : 'grey'"
              @click="toggleStatus(item)"
              style="cursor: pointer"
            >
              mdi-power
            </v-icon>
            <v-icon
              small
              color="red"
              @click="deleteUser(item)"
              style="cursor: pointer"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="showAddUserDialog" max-width="600px">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold" style="color: #0000cc">
          Add New User
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-6">
          <v-form ref="form" @submit.prevent="saveNewUser">
            <v-text-field
              v-model="newUser.name"
              label="Full Name"
              required
              outlined
              dense
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="newUser.email"
              label="Email Address"
              type="email"
              required
              outlined
              dense
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="newUser.role"
              label="Role"
              :items="[
                'Civil Engineer',
                'Architect',
                'Electrical Engineer',
                'Inspector',
                'Mechanical Engineer',
              ]"
              required
              outlined
              dense
              class="mb-4"
            ></v-select>

            <v-select
              v-model="newUser.status"
              label="Status"
              :items="['Active', 'Inactive']"
              required
              outlined
              dense
              class="mb-4"
            ></v-select>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closeAddUserDialog"> Cancel </v-btn>
          <v-btn color="#0000CC" dark @click="saveNewUser"> Add User </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "UserManagement",
  setup() {
    // Note: Since 'goBack' is removed, the useRouter setup is technically unnecessary,
    // but kept for completeness if routing is needed elsewhere.
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      search: "",
      filterStatus: null,
      showAddUserDialog: false,
      newUser: {
        name: "",
        email: "",
        role: "",
        status: "Active",
      },
      headers: [
        { title: "Name", align: "start", sortable: true, key: "name" },
        { title: "Email", key: "email" },
        { title: "Role", key: "role" },
        { title: "Status", key: "status" },
        { title: "Date Added", key: "dateAdded" },
        { title: "Actions", key: "actions", sortable: false, align: "right" },
      ],
      users: [
        {
          id: 1,
          initials: "JS",
          name: "John A. Smith",
          email: "john.smith@gov.ph",
          role: "Civil Engineer",
          status: "Active",
          dateAdded: "1/15/2024",
        },
        {
          id: 2,
          initials: "MG",
          name: "Maria Garcia",
          email: "maria.garcia@gov.ph",
          role: "Architect",
          status: "Active",
          dateAdded: "2/20/2024",
        },
        {
          id: 3,
          initials: "RJ",
          name: "Robert L. Johnson",
          email: "robert.johnson@gov.ph",
          role: "Electrical Engineer",
          status: "Active",
          dateAdded: "3/10/2024",
        },
        {
          id: 4,
          initials: "PW",
          name: "Patricia Williams",
          email: "patricia.williams@gov.ph",
          role: "Inspector",
          status: "Active",
          dateAdded: "4/5/2024",
        },
        {
          id: 5,
          initials: "MB",
          name: "Michael Brown",
          email: "michael.brown@gov.ph",
          role: "Mechanical Engineer",
          status: "Inactive",
          dateAdded: "12/1/2023",
        },
      ],
    };
  },
  computed: {
    filteredUsers() {
      if (this.filterStatus === null) {
        return this.users;
      }
      return this.users.filter((user) => user.status === this.filterStatus);
    },
  },
  methods: {
    // The goBack method is now removed.
    setFilter(status) {
      this.filterStatus = status;
    },
    roleColor(role) {
      switch (role) {
        case "Civil Engineer":
          return "red lighten-3";
        case "Architect":
          return "orange lighten-3";
        case "Electrical Engineer":
          return "yellow lighten-1";
        case "Inspector":
          return "green lighten-3";
        case "Mechanical Engineer":
          return "deep-purple lighten-3";
        default:
          return "grey lighten-2";
      }
    },
    addUser() {
      this.showAddUserDialog = true;
      this.resetNewUserForm();
    },
    closeAddUserDialog() {
      this.showAddUserDialog = false;
      this.resetNewUserForm();
    },
    resetNewUserForm() {
      this.newUser = {
        name: "",
        email: "",
        role: "",
        status: "Active",
      };
    },
    saveNewUser() {
      if (
        this.newUser.name &&
        this.newUser.email &&
        this.newUser.role &&
        this.newUser.status
      ) {
        const initials = this.newUser.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const today = new Date();
        const dateAdded = `${
          today.getMonth() + 1
        }/${today.getDate()}/${today.getFullYear()}`;

        const newUserObj = {
          id: this.users.length + 1,
          initials: initials,
          name: this.newUser.name,
          email: this.newUser.email,
          role: this.newUser.role,
          status: this.newUser.status,
          dateAdded: dateAdded,
        };

        this.users.push(newUserObj);
        this.closeAddUserDialog();
      } else {
        alert("Please fill in all fields");
      }
    },
    toggleStatus(user) {
      user.status = user.status === "Active" ? "Inactive" : "Active";
    },
    deleteUser(user) {
      if (confirm(`Are you sure you want to delete ${user.name}?`)) {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Scoped styles */
</style>