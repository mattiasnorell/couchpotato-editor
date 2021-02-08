import Vue from 'vue';
import Component from 'vue-class-component';
import { Layout } from '_components/base/layout/layout';
import { InputText } from '_components/base/input-text/inputText';
import { Collapse } from '_components/base/collapse/collapse';
import { WidgetRunCouchpotato } from '_pages/dashboard/widgets/widgetRunCouchpotato';
import { WidgetCheckLocalConnection } from '_pages/dashboard/widgets/widgetCheckLocalConnection';
import { WidgetCheckCouchpotatoVersion } from '_pages/dashboard/widgets/widgetCheckCouchpotatoVersion';
import { WidgetCheckCron } from '_pages/dashboard/widgets/widgetCheckCron';
import { WidgetLastRunLog } from '_pages/dashboard/widgets/widgetLastRunLog';
import { RequireTokenDecorator } from 'src/decorators/RequireTokenDecorator';

@Component({
  name: 'Dashboard',
  template: require('./dashboard.pug'),
  components: {
    Layout,
    Collapse,
    InputText,
    WidgetRunCouchpotato,
    WidgetCheckLocalConnection,
    WidgetCheckCouchpotatoVersion,
    WidgetCheckCron,
    WidgetLastRunLog
  }
})
@RequireTokenDecorator()
export default class Dashboard extends Vue {
  public created() {
  }
}
