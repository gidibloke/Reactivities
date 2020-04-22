using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class ActivityEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }


        }

        public class Query : IRequest<ActivityEnvelope>
        {
            public Query(int? limit, int? offsets, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offsets = offsets;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;


            }
            public int? Limit { get; set; }
            public int? Offsets { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
            
        }


        public class Handler : IRequestHandler<Query, ActivityEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<ActivityEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities
                    .Where(x => x.Date >= request.StartDate)
                    .OrderBy(x=> x.Date)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(x =>
                        x.UserActivities.Any(a => a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(x =>
                        x.UserActivities.Any(a =>
                            a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));

                }
                
                var activities = await queryable
                    .Skip(request.Offsets ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();
                return new ActivityEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = queryable.Count()
                };
            }
        }
    }
}