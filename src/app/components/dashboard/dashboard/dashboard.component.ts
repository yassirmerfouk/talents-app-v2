import {Component, inject, OnInit} from '@angular/core';
import {StatisticService} from "../../../services/statistic.service";
import {Statistic} from "../../../models/statistic.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  private statisticService: StatisticService = inject(StatisticService);

  public statistic !: Statistic;

  public ngOnInit(): void {
    this.statisticService.getStatistics().subscribe({
      next: (statistic: Statistic) => {
        this.statistic = statistic;
      }
    });
  }
}
