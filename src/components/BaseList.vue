<template>
  <div
    :key="action.id"
    class="list-row"
    :class="{ active: activeAction === action.id }"
  >
    <div class="list-item">
      <div class="status ml-4 ">
        <svg
          v-if="
            action.done ||
              (action.sublist &&
                action.sublist.every(subAction => subAction.done))
          "
          class="done"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle class="primary" cx="12" cy="12" r="10"></circle>
          <path
            class="secondary"
            d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
          ></path>
        </svg>

        <svg
          v-else
          class="waiting"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" class="primary" />
          <rect width="7" height="7" x="8.5" y="8.5" class="secondary" rx="1" />
        </svg>
      </div>
      <div
        :class="{
          'font-gray': !action.done && (!action.todo || action.disabled)
        }"
        v-text="action.title"
      ></div>

      <div class="flex-righ btn-group" role="group">
        <span v-if="action.pending" class="pending">
          Please wait a few seconds while the document is being finalised
        </span>
        <div v-else>
          <button
            v-if="!action.done && action.todo"
            class="btn btn-primary"
            :class="{ disabled: action.disabled }"
            @click.stop="!action.disabled && action.run()"
          >
            <i :class="`fas fa-${action.icon}`"></i>
            <span v-text="action.action"></span>
          </button>
        </div>
        <div v-if="action.download && action.download.roles.includes(role)">
          <button class="btn ml-4" @click="action.download.run()">
            <i class="fas fa-download"></i>
            {{ action.download.name }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="activeAction === action.id && !action.sublist">
      <div class="list-content" colspan="3">
        <!-- Status history -->
        <div v-if="action.contentType === 'status_history'">
          <div v-if="action.contentData">
            <div class="font-uppercase mb-2">Signature history</div>
            <div>
              <div
                v-for="(status, index) in action.contentData.status_history"
                :key="index"
                class="list-item"
              >
                <div>
                  <el-tooltip :content="action.contentData.statusExplained()">
                    <div
                      class="status-bullet"
                      :class="action.contentData.badge(status.status)"
                    ></div>
                  </el-tooltip>
                  {{ action.contentData.statusForHumans(status.status) }}
                </div>
                <div class="text-right">
                  <eq-readable-date
                    :readable="status.created_at_human"
                    :timestamp="status.created_at"
                  ></eq-readable-date>
                </div>
              </div>
            </div>
          </div>
          <span v-else class="no-results">
            No signature history is currently available...
          </span>
        </div>
      </div>
    </div>

    <!-- second level -->
    <check-list-row
      v-for="subAction in action.sublist"
      :key="subAction.id"
      :action="subAction"
      :class="'list-row second-level'"
    >
    </check-list-row>
  </div>
</template>

<script>
export default {
  name: "listRow",
  props: {
    action: {
      type: Object,
      default: () => ({})
    },
    role: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      activeAction: null
    };
  }
};
</script>

<style scoped>
.status {
  padding-right: 1rem;
}
.status svg {
  display: block;
  width: 2.5rem;
  height: 2.5rem;
}
.status svg.done .primary {
  fill: #c6f6d5;
}
.status svg.done .secondary {
  fill: #2f855a;
}
.status svg.todo .primary {
  fill: #feebc8;
}
.status svg.todo .secondary {
  fill: #c05621;
}
.status svg.waiting .primary {
  fill: #edf2f7;
}
.status svg.waiting .secondary {
  fill: #4a5568;
}
.list-row {
  border-bottom: solid 1px #ddd;
  cursor: pointer;
}
.list-row:hover,
.list-row.active {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  background-color: #f7fafc;
}
.list-row.second-level {
  padding-left: 2rem;
  border: none;
}
.second-level:hover,
.second-level.active {
  background-color: #e5eef3;
}
.list-item {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-item:hover {
  text-decoration: underline;
}
.list-content {
  padding: 1rem 1rem 1rem 3rem;
}

.list-content .status-bullet {
  display: inline-block;
  margin-right: 0.6rem;
  width: 1.2rem;
  height: 1.2rem;
  margin-top: -4px;
  padding: 0;
}
.list-row .list-item button.show-history {
  border-radius: 50%;
  color: #80878e;
  background-color: #fff;
  border: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.21);
  font-weight: 600;
  padding: 0;
  background-color: #edf2f7;
  width: 3rem;
  text-align: center;
  height: 3rem;
  font-size: 1.4rem;
  line-height: 2.5;
}

.py-0 {
  padding-top: 0;
  padding-bottom: 0;
}
.font-gray {
  color: #aaa;
}
.no-results,
.pending {
  font-style: italic;
  text-align: center;
  padding: 2rem 0;
  color: #718096;
}

.ml-4 {
  margin-left: 1rem;
}
.flex-righ {
  margin-left: auto;
  display: flex;
}
</style>
