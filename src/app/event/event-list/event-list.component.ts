import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  selectedEvent: any;
  betAmount: number = 0;
  selectedOutcome: string | null = null;
  showSidebar: boolean = false;
  showBetButton: boolean = false;

  allBets: any[] = [];

  sports = [
    { id: 'sr:sport:1', name: 'Fútbol' },
    { id: 'sr:sport:2', name: 'Baloncesto' },
  ];
  selectedSportId: string = '';

  searchTerm: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    console.log('EventListComponent inicializado');
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (response) => {
        if (response && response.data) {
          this.events = response.data;
          this.filteredEvents = this.events;
        } else {
          console.error('Formato de datos inesperado:', response);
        }
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }

  loadEvent(): void {
    const params = this.selectedSportId
      ? { sportId: this.selectedSportId }
      : {};
    this.eventService.getEvent(params).subscribe(
      (response) => {
        if (response && response.data) {
          this.events = response.data;
          this.filteredEvents = this.events;
        } else {
          console.error('Formato de datos inesperado:', response);
        }
      },
      (error) => {
        console.error('Error al cargar eventos:', error);
      }
    );
  }

  closeSidebar(): void {
    this.showSidebar = false;
    this.showBetButton = true;
  }

  selectEvent(event: any): void {
    this.selectedEvent = event;
    this.showSidebar = true;
    this.showBetButton = false;
  }

  submitBet(): void {
    if (this.betAmount && this.selectedOutcome && this.selectedEvent) {
      const outcome =
        this.selectedEvent.markets[0].marketLines[0].outcomes.find(
          (o: any) => o._id === this.selectedOutcome
        );

      if (outcome) {
        const newBet = {
          eventName: this.selectedEvent.sportEventName.es,
          homeTeam: this.selectedEvent.competitorHome.competitorName.es,
          awayTeam: this.selectedEvent.competitorAway.competitorName.es,
          result: outcome.outcomeName.es,
          amount: this.betAmount,
          odds: outcome.odds,
          potentialWinnings: this.betAmount * outcome.odds,
        };

        this.allBets.push(newBet);

        this.eventService.saveBet(newBet).subscribe(
          (response) => {
            console.log('Apuesta guardada:', response);
          },
          (error) => {
            console.error('Error al guardar la apuesta:', error);
          }
        );
        this.showBetButton = true;
      }
    }
  }

  filterEvents(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredEvents = this.events.filter((event) => {
        const homeTeam = event.competitorHome.competitorName.es.toLowerCase();
        const awayTeam = event.competitorAway.competitorName.es.toLowerCase();
        const searchTerm = this.searchTerm.toLowerCase();
        return homeTeam.includes(searchTerm) || awayTeam.includes(searchTerm);
      });
    } else {
      this.filteredEvents = this.events;
    }
  }
}
